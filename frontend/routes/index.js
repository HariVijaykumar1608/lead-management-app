import axios from 'axios';
import config from '../config';

const login = async (payload) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/login`, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error occurred while logging in:', error);
    throw error;
  }
};

const getLeads = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const queryString = params.toString();
    const url = queryString
      ? `${config.API_BASE_URL}/leads?${queryString}`
      : `${config.API_BASE_URL}/leads`;

    const response = await axios.get(url, { withCredentials: true });

    if (response.data?.success !== true) {
      throw new Error('Failed to fetch leads');
    }

    return response.data.data || [];
  } catch (error) {
    console.error('Error occurred while fetching leads:', error);
    throw error;
  }
};

const createLead = async (payload) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/leads`, payload, {
      withCredentials: true,
    });
    if (response.data?.success !== true) {
      throw new Error('Failed to create lead');
    }

    return response.data || {};
  } catch (error) {
    console.error('Error occurred while creating lead:', error);
    throw error;
  }
};

const updateLead = async (leadId, payload) => {
  try {
    const response = await axios.patch(`${config.API_BASE_URL}/leads?id=${leadId}`, payload, {
      withCredentials: true,
    });
    if (response.data?.success !== true) {
      throw new Error('Failed to update lead');
    }
    return response.data || {};
  } catch (error) {
    console.error('Error occurred while updating lead:', error);
    throw error;
  }
};

const deleteLead = async (leadId) => {
  try {
    const response = await axios.delete(`${config.API_BASE_URL}/leads?id=${leadId}`, {
      withCredentials: true,
    });
    if (response.data?.success !== true) {
      throw new Error('Failed to delete lead');
    }
    return response.data || {};
  } catch (error) {
    console.error('Error occurred while deleting lead:', error);
    throw error;
  }
};

export { login, getLeads, createLead, updateLead, deleteLead };