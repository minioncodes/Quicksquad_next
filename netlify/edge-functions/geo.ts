interface NetlifyGeo {
  country?: { code?: string };
  subdivision?: { code?: string };
}

interface NetlifyRequest extends Request {
  geo?: NetlifyGeo;
}

const geoHandler = async (request: Request) => {
  const req = request as NetlifyRequest;

  const country = req.geo?.country?.code || "US";

  // Expose detected country — no rewrite
  return new Response(null, {
    headers: {
      "x-country": country,
      "set-cookie": `country=${country}; Path=/; HttpOnly; SameSite=Lax`,
    },
  });
};

export default geoHandler;
