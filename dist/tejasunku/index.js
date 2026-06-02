const index = {
  fetch(request) {
    return new Response("Hello, World!");
  }
};
const workerEntry = index ?? {};
export {
  workerEntry as default
};
