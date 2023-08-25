import axios from "./axios";

export const ADD_LEAVE_REQUEST_URL = "api/leave_requests";
export const GET_LEAVE_REQUESTS_URL = "api/leave_requests";
export const updateLeaveRequestUrl = (id) => "api/leave_requests/" + id;

export const fetchLeaveRequestsToTreatByDr = async () => {
   try {
      const params = {
         params: {
            status: "pending",
            priority: 2
         }
      };
      const response = await axios.get(GET_LEAVE_REQUESTS_URL, params);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const fetchLeaveRequestsToTreatByHR = async () => {
   try {
      const params = {
         params: {
            status: "pending",
            priority: 1
         }
      };
      const response = await axios.get(GET_LEAVE_REQUESTS_URL, params);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const updateLeaveRequestStatus = async (id, data) => {
   try {
      const response = await axios.put(updateLeaveRequestUrl(id), data);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const getUserLeaveRequets = async (id) => {
   try {
      const params = {
         params: {
            empolyee: id
         }
      };
      const response = await axios.get(GET_LEAVE_REQUESTS_URL, params);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
}

export const getAcceptedLeaveRequets = async () => {
   try {
      const params = {
         params: {
            status: 'accepted'
         }
      };
      const response = await axios.get(GET_LEAVE_REQUESTS_URL, params);
      return response.data;
   } catch (error) {
      console.log(error);
      return [];
   }
}