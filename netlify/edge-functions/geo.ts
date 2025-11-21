const geoHandler = async (request: Request) => {
  // @ts-expect-error: Netlify injects geo at runtime
  const country = request.geo?.country?.code || "IN";

  const url = new URL(request.url);

  if (url.pathname === "/") {
    if (country === "AU") url.pathname = "/au";
    if (country === "US") url.pathname = "/us";
  }

  return new Response(null, {
    headers: {
      "x-middleware-rewrite": url.toString(),
      "set-cookie": `country=${country}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    },
  });
};

export default geoHandler;
