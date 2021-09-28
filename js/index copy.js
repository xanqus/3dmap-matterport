async function connectSdk() {
  const sdkKey = "fqns0dx3gcmt4as525w5cyd6a"; // TODO: replace with your sdk key
  const iframe = document.getElementById("showcase-iframe");

  // connect the sdk; log an error and stop if there were any connection issues
  try {
    const mpSdk = await window.MP_SDK.connect(
      iframe, // Obtained earlier
      sdkKey, // Your SDK key
      "" // Unused but needs to be a valid string
    );
    onShowcaseConnect(mpSdk);
  } catch (e) {
    console.error(e);
  }
}

async function onShowcaseConnect(mpSdk) {
  // insert your sdk code here. See the ref https://matterport.github.io/showcase-sdk//docs/sdk/reference/current/index.html

  // try retrieving the model data and log the model's sid

  try {
    const modelData = await mpSdk.Model.getData();
    var mattertagDesc = {
      label: "Hello Mattertag",
      anchorPosition: { x: 1.0, y: 1.0, z: 1.0 },
      stemVector: { x: 0, y: 0, z: 0 },
    };

    mpSdk.Mattertag.add(mattertagDesc).then(function (mattertagId) {
      console.log(mattertagId);
      // output: TODO
    });
    console.log("Model sid:" + modelData.sid);
    console.log("Model");
  } catch (e) {
    console.error(e);
  }
}

connectSdk();
