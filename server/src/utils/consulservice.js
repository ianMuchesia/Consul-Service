


exports.consulCreateExternalService = async(data) =>
{
    try {
        const res = await axios.post("http://consul:8500/v1/agent/service/register", data, {
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