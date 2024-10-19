import axios from 'axios';

const BASE_URL = "https://staging.lockated.com/rule_engine/applicable_models/loyalty_re.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&company_id=44&active=true";

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

  // Fetch Master Attributes with companyId and activeStatus
export const fetchMasterAttributes = async (companyId, activeStatus) => {
    try {
      const response = await api.get('/master_attributes', {
        params: {
          companyId,
          activeStatus,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching master attributes:', error);
      throw error;
    }
  };

  // Fetch Sub Attributes based on Master Attribute ID
export const fetchSubAttributes = async (masterAttributeId) => {
    try {
      const response = await api.get('/sub_attributes', {
        params: {
          masterAttributeId,
        },
      });
      return response.data;
      
    } catch (error) {
      console.error('Error fetching sub attributes:', error);
      throw error;
    }
  };
  

  // Fetch Master Reward Outcomes with companyId and activeStatus
export const fetchMasterRewardOutcomes = async (companyId, activeStatus) => {
    try {
      const response = await api.get('/master_reward_outcomes', {
        params: {
          companyId,
          activeStatus,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching master reward outcomes:', error);
      throw error;
    }
  };


  // Fetch Sub reward outcome based on Master reward outcome ID
export const fetchSubRewardOutcomes = async (masterRewardOutcomeId) => {
  try {
    const response = await api.get('/sub_master_reward_outcomes', {
      params: {
        masterRewardOutcomeId,
      },
    });
    return response.data;
    
  } catch (error) {
    console.error('Error fetching sub attributes:', error);
    throw error;
  }
};

