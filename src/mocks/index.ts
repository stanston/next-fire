async function initMocks() {
  // if (typeof window === "undefined") {
  //   const { server } = await import("./server");
  //   server.listen();
  // } else {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

initMocks();

export {};
