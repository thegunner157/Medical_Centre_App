import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import api from '../../services/backend';
import IMeeting from '../../types/IMeeting';
import IPatient from '../../types/IPatient';
import Navbar from '../Navbar/Navbar';
import MeetingsList from './MeetingsList';

const Patient = () => {
  const { t } = useTranslation();
  const params = useParams();

  const [patient, setPatient] = useState<IPatient>();
  const [patientMeetingsList, setPatientMeetingsList] = useState<IMeeting[]>([]);
  const [availableMeetingsList, setAvailableMeetingsList] = useState<IMeeting[]>([]);

  const getPatient = async () => {
    try {
      const response = await api.get(`/patient/${params.patientPesel}`);
      setPatient(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const getPatientVisits = async () => {
    try {
      const patientBookedVisitsResponse = await api.get('/visits', { params: { patientPesel: params.patientPesel } });
      const patientBookedVisits = patientBookedVisitsResponse.data;

      const patientVisits = patientBookedVisits.map(async (visit) => {
        const getDoctorResponse = await api.get(`/doctor/${visit.doctorPesel}`);
        const visitDoctor = getDoctorResponse.data;
        return {
          id: visit.id,
          doctorFirstName: visitDoctor.firstName,
          doctorLastName: visitDoctor.lastName,
          doctorSpec: visitDoctor.spec,
          startHour: visit.startTime,
          endHour: visit.endTime,
          date: visit.day,
          patientPesel: visit.patientPesel,
        }
      });

      setPatientMeetingsList(patientVisits);
    } catch (error) {
      console.log(error);
    }
  };

  const getUnbookedVisits = async () => {
    try {
      const unbookedVisitsResponse = await api.get('/visits', { params: { isBooked: false } });
      const unbookedVisits = unbookedVisitsResponse.data;

      const availableMeetings = unbookedVisits.map(async (visit) => {
        const getDoctorResponse = await api.get(`/doctor/${visit.doctorPesel}`);
        const visitDoctor = getDoctorResponse.data;
        return {
          id: visit.id,
          doctorFirstName: visitDoctor.firstName,
          doctorLastName: visitDoctor.lastName,
          doctorSpec: visitDoctor.spec,
          startHour: visit.startTime,
          endHour: visit.endTime,
          date: visit.day,
          patientPesel: visit.patientPesel,
        }
      });

      setAvailableMeetingsList(availableMeetings);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelMeeting = async (meeting: IMeeting) => {
    try {
      await api.put('/visitunbook', null, { params: { visitId: meeting.id } });

      getPatientVisits();
      getUnbookedVisits();
    } catch (error) {
      console.log(error);
    }
  }

  const bookMeeting = async (meeting: IMeeting) => {
    try {
      await api.put('/visitbook', null, { params: { visitId: meeting.id, patientPesel: params.patientPesel } });

      getPatientVisits();
      getUnbookedVisits();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPatient();
    getPatientVisits();
    getUnbookedVisits();
  }, [params.patientId]);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem 0' }}>
        <h2>
          { t('hey') }
          { ', ' }
          { patient?.firstName }
          { ' ' }
          { patient?.lastName }
        </h2>
        <hr />
        <h3>
          { t('yourAppointments') }
          :
        </h3>
        <MeetingsList meetingsList={patientMeetingsList} deleteItem={cancelMeeting} />
        <hr />
        <h3>
          { t('availableAppointments') }
          :
        </h3>
        <MeetingsList meetingsList={availableMeetingsList} deleteItem={bookMeeting} />
      </main>
    </div>
  );
}

export default Patient;
