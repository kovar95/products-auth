const findPlatform = () => {
  const platform = process.platform;

  let operatingSystem = "";

  switch (platform) {
    case "darwin":
      operatingSystem = "MacOS";
      break;
    case "win32":
      operatingSystem = "Windows";
      break;
    case "linux":
      operatingSystem = "Linux";
      break;
    default:
      operatingSystem = "Windows";
      break;
  }

  return operatingSystem;
};
