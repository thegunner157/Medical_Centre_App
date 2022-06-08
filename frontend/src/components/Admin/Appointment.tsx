import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import IAppointment from '../../types/IAppointment';

interface IAppointmentProps {
    appointment: IAppointment;
    index: number;
}

const Appointment = ({ appointment } : IAppointmentProps) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{appointment.date}</td>
      <td>{appointment.startHour}</td>
      <td>{appointment.endHour}</td>
      <td>{appointment.patientFirstName}</td>
      <td>{appointment.patientLastName}</td>
      <td>
        <Button variant="primary" type="submit">{ t('cancel') }</Button>
      </td>
    </tr>
  );
}

export default Appointment;
