"use strict;";

let num = 1;
const key = "fqns0dx3gcmt4as525w5cyd6a";
const params = "&help=0&play=1&qs=1&gt=0&hr=0";
const matSpace = "https://my.matterport.com/show/?m=";
let matSid = "bgtTnNDex3o";
let iframe;
let addTagBtn;
let container;
let tag;
let table_container;
let iconId;
const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;

let targetATag;

var selFile = document.querySelector("#sel-file");
var testBtn = document.querySelector("#testBtn");
var testBtn2 = document.querySelector("#testBtn2");

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function clickListImage(e) {
  console.log(e.target.parentElement.id);
  iconId = e.target.parentElement.id;
}

function addList(value, mpSdk, iconImage) {
  // 1. 추가할 값을 input창에서 읽어온다
  const addValue = value;
  iconId = uuidv4();

  mpSdk.Mattertag.registerIcon(iconId, iconImage);
  /*
  // 2. 추가할 li element 생성
  // 2-1. 추가할 li element 생성
  const a = document.createElement("a");
  a.id = iconId;
  a.href = "javascript:void(0);";
  a.addEventListener("click", clickListImage);
  const li = document.createElement("li");

  // 2-2. li에 id 속성 추가
  li.appendChild(a);

  // 2-3. li에 text node 추가
  const imgNode = document.createElement("img");
  imgNode.style.width = "100px";
  imgNode.style.height = "100px";
  imgNode.src = addValue;
  a.appendChild(imgNode);

  // 3. 생성된 li를 ul에 추가
  document.getElementById("list").appendChild(li);*/
}

document.addEventListener("DOMContentLoaded", () => {
  iframe = document.querySelector(".showcase");
  container = document.querySelector(".showcase_container");
  addTagBtn = document.querySelector(".add_tag");
  importBtn = document.querySelector(".import_tags");
  exportBtn = document.querySelector(".export_tags");
  removeBtn = document.querySelector(".remove_tags");
  sidSelector = document.getElementById("sid-input");
  table_container = document.querySelector(".nav__list");
  iframe.setAttribute("src", `${matSpace}${matSid}${params}`);
  iframe.addEventListener("load", showcaseLoader, true);

  //sidSelector.setAttribute("value", matSid);

  /*sidSelector.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      matSid = sidSelector.value;
      iframe.setAttribute("src", `${matSpace}${matSid}${params}`);
    }
  });*/
});

function showcaseLoader() {
  try {
    window.MP_SDK.connect(iframe, key, "3.2")
      .then(loadedShowcaseHandler)
      .catch(console.error);
  } catch (e) {
    console.error(e);
  }
}

function populateTags(tags, sort = "label") {
  const curTags = document.querySelectorAll(".scrollable tbody tr");
  curTags.forEach((tag) => {
    tag.remove();
  });
  tags.forEach(addToTable);
}

function addToTable(tag) {
  let elem;
  let row;
  console.log("tag", tag);
  console.log("table_container", table_container);
  if (table_container) {
    const a = document.createElement("a");
    a.innerText = `Tag ${num}`;
    a.href = "#";
    a.className = "nav__link";
    a.id = tag.sid;
    a.addEventListener("click", (e) => {
      e.preventDefault();
    });
    const div = document.createElement("div");
    div.innerText = "내용";
    div.style.display = "none";
    num = num + 1;
    a.appendChild(div);
    table_container.appendChild(a);
  }
}

function loadedShowcaseHandler(mpSdk) {
  let addingTag = false;
  let movingTag = false;
  // Fetch tags
  mpSdk.Mattertag.getData()
    .then((tags) => {
      mattertags = tags;
      populateTags(tags);
      setupTagFunctionality();
    })
    .catch(console.error);
  ////
  document.addEventListener("DOMNodeInserted", function () {
    /* LINK ACTIVE */
    const linkColor = document.querySelectorAll(".nav__link");
    function colorLink(e) {
      console.log(e.target.id);
      const jsSubmit = () => {
        targetATag = document.getElementById(e.target.id);
        targetATag.innerText = tagNameInput.value;
        mpSdk.Mattertag.editBillboard(e.target.id, {
          label: tagNameInput.value,
          description: tagDescriptionInput.value,
        });
        if (imageLink.value != "") {
          mpSdk.Mattertag.editBillboard(e.target.id, {
            media: {
              type: mpSdk.Mattertag.MediaType.PHOTO,
              src: imageLink.value,
            },
          });
        }
        if (videoLink.value != "") {
          mpSdk.Mattertag.editBillboard(e.target.id, {
            media: {
              type: mpSdk.Mattertag.MediaType.VIDEO,
              src: videoLink.value,
            },
          });
        }
        tagNameInput.value = "";
        tagDescriptionInput.value = "";
        imageLink.value = "";
        videoLink.value = "";

        //alert(e.target.id);
        console.log(tagNameInput.value);
      };

      linkColor.forEach((element) => {
        console.log(element.id);
        editDiv.style.display = "block";
        editDiv.id = e.target.id;
        element.classList.remove("active");

        modalSubmitBtn.onclick = () => {
          imageLink.value = modalSubmitBtn.id;
          imageModal.style.display = "none";
          imageModal.classList.remove("modal_expander");
          safeImage1.checked = false;
          safeImage2.checked = false;
          safeImage3.checked = false;
          safeImage4.checked = false;
          safeImage5.checked = false;
          safeImage6.checked = false;
        };
      });
      this.classList.add("active");
      editBtn.onclick = jsSubmit;
    }

    linkColor.forEach((element) =>
      element.addEventListener("click", colorLink)
    );

    /* COLLAPSE MENU */
    const linkCollapse = document.getElementsByClassName("collapse__link");
    var i;

    for (i = 0; i < linkCollapse.length; i++) {
      linkCollapse[i].addEventListener("click", function () {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle("showCollapse");

        const rotate = collapseMenu.previousElementSibling;
        rotate.classList.toggle("rotate");
      });
    }
  });
  ////
  /*
  testBtn.onclick = () => {
    mpSdk.Mattertag.getData().then((tags) => {
      mpSdk.Mattertag.editBillboard(tags[0].sid, {
        media: {
          type: mpSdk.Mattertag.MediaType.PHOTO,
          src: "https://static.matterport.com/mp_cms/media/filer_public/71/ca/71cabc75-99a5-41a4-917c-f45203f9254e/pro-21f8ddbae.png",
        },
      });
    });
  };

  testBtn2.onclick = () => {
    mpSdk.Mattertag.getData().then((tags) => {
      mpSdk.Mattertag.editBillboard(tags[1].sid, {
        media: {
          type: mpSdk.Mattertag.MediaType.VIDEO,
          src: "https://www.youtube.com/watch?v=fC2aDEMo0Og",
        },
      });
    });
  };
  */

  function onchangeInput() {
    var getList = this.files;

    // 읽기
    var reader = new FileReader();
    reader.readAsDataURL(getList[0]);

    //로드 한 후
    reader.onload = function () {
      //const data = (document.querySelector("#print").src = reader.result);
      addList(null, mpSdk, reader.result);
    };
  }

  selFile.onchange = onchangeInput;

  function placeTag() {
    if (tag)
      mpSdk.Mattertag.navigateToTag(tag, mpSdk.Mattertag.Transition.INSTANT);
    tag = null;
    movingTag = false;
  }

  if (!isFirefox) {
    focusDetect();
  }

  function focusDetect() {
    const eventListener = window.addEventListener("blur", function () {
      if (document.activeElement === iframe) {
        placeTag(); //function you want to call on click
        setTimeout(function () {
          window.focus();
        }, 0);
      }
      window.removeEventListener("blur", eventListener);
    });
  }

  function overlayDetect() {
    if (tag) {
      const overlay = document.createElement("div");
      overlay.setAttribute("class", "click-overlay");
      overlay.addEventListener("mousemove", (e) => {
        mpSdk.Renderer.getWorldPositionData({
          x: e.clientX - 30,
          y: e.clientY - 5,
        })
          .then((data) => {
            updateTagPos(data.position);
          })
          .catch((e) => {
            console.error(e);
            placeTag();
          });
      });
      overlay.addEventListener("click", (e) => {
        placeTag();
        overlay.remove();
      });
      container.insertAdjacentElement("beforeend", overlay);
    }
  }

  function updateTagPos(newPos, newNorm = undefined, scale = undefined) {
    if (!newPos) return;
    if (!scale) scale = 0.33;
    if (!newNorm) newNorm = { x: 0, y: 1, z: 0 };

    mpSdk.Mattertag.editPosition(tag, {
      anchorPosition: newPos,
      stemVector: {
        x: scale * newNorm.x,
        y: scale * newNorm.y,
        z: scale * newNorm.z,
      },
    }).catch((e) => {
      console.error(e);
      tag = null;
      movingTag = false;
    });
  }

  mpSdk.Pointer.intersection.subscribe((intersectionData) => {
    if (tag && !movingTag) {
      if (
        intersectionData.object === "intersectedobject.model" ||
        intersectionData.object === "intersectedobject.sweep"
      ) {
        updateTagPos(intersectionData.position, intersectionData.normal);
      }
    }
  });

  addTagBtn.addEventListener("click", () => {
    if (!addingTag && !tag) {
      addingTag = true;
      mpSdk.Mattertag.add([
        {
          label: "Tag",
          description: "",
          anchorPosition: { x: 0, y: 0, z: 0 },
          stemVector: { x: 0, y: 0, z: 0 },
          color: { r: 1, g: 0, b: 0 },
        },
      ])
        .then((sid) => {
          tag = sid[0];
          if (iconId !== undefined) {
            mpSdk.Mattertag.editIcon(sid[0], iconId);
          }

          return mpSdk.Mattertag.getData();
        })
        .then((collection) => {
          const t_sid = collection.find((elem) => elem.sid === tag);
          const row = addToTable(t_sid);
          addTagListeners(row);
          addingTag = false;
        })
        .then(() => {
          if (isFirefox) overlayDetect();
        })
        .catch((e) => {
          console.error(e);
          addingTag = false;
        });
    }
  });

  function replaceShowcaseTags(tags) {
    return mpSdk.Mattertag.getData()
      .then((oldTags) => {
        oldTagSids = oldTags.map((oldTag) => oldTag.sid);
        return mpSdk.Mattertag.remove(oldTagSids);
      })
      .then(() => {
        tags.forEach((tag) => {
          tag.media.type = "mattertag.media." + tag.media.type;
        });
        return mpSdk.Mattertag.add(tags);
      })
      .then((newSids) => {
        tags.forEach((tag, i) => (tag.sid = newSids[i]));
        return tags;
      })
      .catch((e) => {
        console.error(`${e}: ${tags}`);
      });
  }

  /*importBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    let file;
    input.onchange = (e) => {
      file = e.target.files[0];
      importFile(file);
    };
    setTimeout(() => {
      input.click();
    }, 100);
  });

  removeBtn.addEventListener("click", () => {
    removeAllTags();
  });*/

  function importFile(file) {
    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.addEventListener("load", (e) => {
        const content = e.target.result;
        tags = JSON.parse(content);
        replaceShowcaseTags(tags)
          .then((newTags) => {
            populateTags(newTags);
            setupTagFunctionality();
          })
          .catch(console.error);
      });
    } else {
      window.alert("Please select a .json filetype");
    }
  }

  // from https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
  // Function to download data to a file
  function download(data, filename, type) {
    const file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      const a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  function removeAllTags() {
    mpSdk.Mattertag.getData()
      .then((tags) => {
        return tags.map((tag) => tag.sid);
      })
      .then((tagSids) => {
        return mpSdk.Mattertag.remove(tagSids);
      })
      .catch(console.error);

    document.querySelectorAll("tr").forEach((block) => {
      if (!block || block.children[0].tagName == "TH") return;
      block.parentNode.removeChild(block);
    });
  }

  function exportTags(tags) {
    if (!tags || tags.length == 0) {
      return;
    } // TODO: Let the user know there are no tags
    const filename = "tags.json";
    const tagsText = JSON.stringify(tags);
    download(tagsText, filename, "application/json");
  }

  /*exportBtn.addEventListener("click", () => {
    mpSdk.Mattertag.getData().then(exportTags);
  });*/

  function updateTag(matTagId, label = null, description = null) {
    if (!label && !description) return;

    const props = new Object();
    label ? (props["label"] = label) : {};
    description ? (props["description"] = description) : {};

    mpSdk.Mattertag.editBillboard(matTagId, props).catch((e) => {
      console.error(e);
    });
  }

  function changeInfo(ele, tagId) {
    if (ele.tagName === "TH") {
      return;
    }
    const desc = ele.innerText;
    const change = document.createElement("input");
    change.id = tagId;
    change.value = desc;
    ele.replaceWith(change);
    change.focus();
    change.addEventListener("blur", (e) => {
      clickAway(change, tagId);
    });
    change.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        change.blur();
      }
    });
  }

  function clickAway(ele, tagId) {
    let desc = ele.value;
    const change = document.createElement("td");
    change.id = tagId;
    change.innerText = ele.value;
    ele.replaceWith(change);
    change.removeEventListener("blur", clickAway);
    const lbl = tagId === "label" ? desc : null;
    desc = tagId === "description" ? desc : null;
    updateTag(change.parentElement.id, (label = lbl), (description = desc));
    change.addEventListener("click", () => {
      changeInfo(change, tagId);
    });
  }

  function addTagListeners(block) {
    if (!block || block.children[0].tagName == "TH") {
      return;
    }
    // Label
    block.children[0].addEventListener("click", () => {
      changeInfo(block.children[0], (tagId = "label"));
    });

    // Description
    block.children[1].addEventListener("click", () => {
      changeInfo(block.children[1], (tagId = "description"));
    });

    // arrow icon
    block.children[3].addEventListener("click", () => {
      mpSdk.Mattertag.navigateToTag(
        block.id,
        mpSdk.Mattertag.Transition.FADEOUT
      ).catch((e) => {
        console.error(e);
      });
    });

    // delete icon
    block.children[4].addEventListener("click", () => {
      block.parentNode.removeChild(block);
      mpSdk.Mattertag.remove(block.id).catch((e) => {
        console.log(e);
      });
    });
  }

  function setupTagFunctionality() {
    document.querySelectorAll("tr").forEach(addTagListeners);
  }
} // loadedShowcaseHandler
