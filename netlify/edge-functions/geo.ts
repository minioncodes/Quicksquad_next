interface NetlifyGeo {
  country?: {
    code?: string;
  };
  subdivision?: {
    code?: string;
  };
}

interface NetlifyRequest extends Request {
  geo?: NetlifyGeo;
}

const geoHandler = async (request: Request) => {
  const req = request as NetlifyRequest;

  const country = req.geo?.country?.code;
  const region = req.geo?.subdivision?.code;

  const url = new URL(request.url);

  // Prevent rewrite loops
  if (url.pathname.startsWith("/au") || url.pathname.startsWith("/us")) {
    return new Response(null);
  }

  // fallback: if no region => default to US
  if (!region) {
    url.pathname = "/us";
    return new Response(null, {
      headers: {
        "x-middleware-rewrite": url.toString(),
        "set-cookie": `country=US; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }

  if (url.pathname === "/") {
    if (country === "AU") {
      url.pathname = "/au";
    } else {
      url.pathname = "/us";
    }
  }

  return new Response(null, {
    headers: {
      "x-middleware-rewrite": url.toString(),
      "set-cookie": `country=${country || "US"}; Path=/; HttpOnly; SameSite=Lax`,
    },
  });
};

export default geoHandler;
