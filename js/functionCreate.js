const imageList = [];

var selFile = document.querySelector("#sel-file");

selFile.onchange = function () {
  var getList = this.files;

  // 읽기
  var reader = new FileReader();
  reader.readAsDataURL(getList[0]);

  //로드 한 후
  reader.onload = function () {
    const data = (document.querySelector("#print").src = reader.result);
    addList(data);
  };
};

function clickListImage() {
  alert("hi");
}

function addList(value) {
  // 1. 추가할 값을 input창에서 읽어온다
  const addValue = value;

  // 2. 추가할 li element 생성
  // 2-1. 추가할 li element 생성
  const a = document.createElement("a");
  a.href = "javascript:clickListImage();";
  const li = document.createElement("li");

  // 2-2. li에 id 속성 추가
  li.appendChild(a);

  // 2-3. li에 text node 추가
  const imgNode = document.createElement("img");
  imgNode.src = addValue;
  a.appendChild(imgNode);

  // 3. 생성된 li를 ul에 추가
  document.getElementById("list").appendChild(li);
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
    console.log("uuid", uuidv4());
  } catch (e) {
    console.error(e);
  }
}

connectSdk();
