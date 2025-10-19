import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientDetails from '../patients/pages/PatientDetails';
import Pagenotfound from '../pages/PageNotFound';
import { getItem } from '../utils/localStorageUtils';
import DashBoardLayout from '../layout/DashBoardLayout';
import { createPortal } from 'react-dom';

function ProtectedPatientRoute() {
  const { id } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patients = getItem('patients') || [];
    const data = patients.find(p =>  String(p.id) === String(id));
    setPatientData(data);
    setLoading(false);
  }, [id]);

  if (loading) return null; // or a spinner

  // Invalid ID → full-page 404
  if (!patientData) {
    return  createPortal(
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'white', 
        zIndex: 99999,
        overflow: 'auto'
      }}>
        <Pagenotfound />
      </div>,
      document.body
    );
  }

  // Valid ID → render PatientDetails
  return <PatientDetails patient={patientData} />;
    
}

export default ProtectedPatientRoute;
