import { useTranslation } from 'react-i18next';
import Navbar from '../Navbar/Navbar';
import AddDoctorForm from './AddDoctorForm';

const AddDoctor = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <h2>{ t('doctorAdding') }</h2>
      <AddDoctorForm />
    </div>
  );
}

export default AddDoctor;
