
const axios = require('axios');

exports.consulCreateExternalService = async(data) =>
{
    try {
        const res = await axios.put("http://localhost:8500/v1/agent/service/register", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Consul service registered successfully:", res);

        return res;

        
    } catch (error) {
        console.error("Error registering service with Consul:", error);
    }
}


exports.consulDeleteExternalService = async(serviceId) =>
{
    try {
        const res = await axios.put(`http://localhost:8500/v1/agent/service/deregister/${serviceId}`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Consul service deregistered successfully:", res);

        return res;
        
    } catch (error) {
        console.error("Error deregistering service with Consul:", error);
    }
}