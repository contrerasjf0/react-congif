const finalIP = "http://35.197.33.60";

export const GetPage = (pages, pageName) => {
  const currentPage = pages.find(x => {
    return x.name === pageName;
  });
  return currentPage;
};

export const GetSlider = (currentPage, sectionName, sliderName) => {
  const section = currentPage.sectionPages.find(x => {
    return x.name === sectionName;
  });

  const sliders = section.contentSections.filter(x => {
    return x.name.includes(sliderName) && x.isBase !== true;
  });

  sliders.sort(function(a, b) {
    return parseInt(a.value) - parseInt(b.value);
  });

  return sliders;
};

export const GetContent = (currentPage, sectionName, contentName) => {
  const section = currentPage.sectionPages.find(x => {
    return x.name === sectionName;
  });

  const content = section.contentSections.find(x => {
    return x.name.includes(contentName) && x.isBase !== true;
  });

  return content;
};

export const GetLinkFromContent = (content, linkName, language) => {
  let goTo = "";

  if (content !== undefined && content.dataContentLinks !== undefined) {
    const link = content.dataContentLinks.find(x => {
      return x.name === linkName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (link !== undefined) {
      goTo = link["link" + currentlanguage];
      if (goTo === undefined) {
        goTo = link.link;
      }
    }
  }
  return goTo;
};

export const GetTextFromContent = (content, textName, language) => {
  let textContent = "";
  if (content !== undefined && content.dataContentTexts !== undefined) {
    const text = content.dataContentTexts.find(x => {
      return x.name === textName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (text !== undefined) {
      textContent = text["content" + currentlanguage];
      if (textContent === undefined) {
        textContent = text.content;
      }
    }
  }
  return textContent;
};

export const GetRichTextFromContent = (content, textName, language) => {
  let textContent = "";
  if (content !== undefined && content.dataContentRichTexts !== undefined) {
    const text = content.dataContentRichTexts.find(x => {
      return x.name === textName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (text !== undefined) {
      textContent = text["content" + currentlanguage];
      if (textContent === undefined) {
        textContent = text.content;
      }
    }
  }
  return textContent;
};

export const GetImageFromContent = (content, imageName, language) => {
  let b64 = "";
  let result = undefined;
  if (content !== undefined && content.dataContentImages !== undefined) {
    const image = content.dataContentImages.find(x => {
      return x.name === imageName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (image !== undefined) {
      b64 = image["b64" + currentlanguage];
      if (b64 === undefined) {
        b64 = image.b64;
      }
      console.log(b64);

      if (b64 !== null && b64.preview !== "") {
        if (window.location.origin.includes("localhost")) {
          result = finalIP + b64.preview;
        } else {
          result = b64.preview;
        }
      }
    }
  }
  return result;
};

export const GetFileFromContent = (content, fileName, language) => {
  let file = "";
  let result = "";
  if (content !== undefined && content.dataContentFiles !== undefined) {
    const dataFile = content.dataContentFiles.find(x => {
      return x.name === fileName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (dataFile !== undefined) {
      file = dataFile["file" + currentlanguage];
      if (file === undefined) {
        file = dataFile.file;
      }
      console.log(file);

      if (
        file !== undefined &&
        file !== null &&
        file.preview !== undefined &&
        file.preview !== ""
      ) {
        result = finalIP + file.preview;
      }
    }
  }
  return result;
};

export const GetFileNameFromContent = (content, fileName, language) => {
  let file = "";
  let result = "";
  if (content !== undefined && content.dataContentFiles !== undefined) {
    const dataFile = content.dataContentFiles.find(x => {
      return x.name === fileName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (dataFile !== undefined) {
      file = dataFile["file" + currentlanguage];
      if (file === undefined) {
        file = dataFile.file;
      }
      console.log(file);

      if (file !== undefined && file !== null && file.name !== "") {
        result = file.name;
      }
    }
  }
  return result;
};

export const GetMetatags = (pages, pageName) => {
  const currentPage = pages.find(x => {
    return x.name === pageName;
  });
  return currentPage.metaTags;
};

export const GetArrayALike = (currentPage, sectionName, likeName) => {
  const section = currentPage.sectionPages.find(x => {
    return x.name === sectionName;
  });

  const likeArray = section.contentSections.filter(x => {
    return x.name.includes(likeName) && x.isBase !== true;
  });
  for (let i = 0; i < likeArray.length; i++) {
    const currentSlider = likeArray[i];
    const stringValue = currentSlider.name.replace(likeName, "");
    const numberValue = parseInt(stringValue);
    likeArray[i].sortValue = numberValue;
  }

  likeArray.sort(function(a, b) {
    return parseInt(a.numberValue) - parseInt(b.numberValue);
  });

  return likeArray;
};

export const UpdateArrayImage = (currentPage, sectionName, currentArray) => {
  const section = currentPage.sectionPages.find(x => {
    return x.name === sectionName;
  });

  console.log("SECTION SHIT", section);
  for (let i = 0; i < currentArray.length; i++) {
    const dataGet = section.contentSections.find(x => {
      return x.name === currentArray[i].name;
    });
    console.log("CURRENT ARRAY SHIT", dataGet);
    currentArray[i].dataContentImages = dataGet.dataContentImages;
  }

  return currentArray;
};

export const UpdateArrayFile = (currentPage, sectionName, currentArray) => {
  const section = currentPage.sectionPages.find(x => {
    return x.name === sectionName;
  });

  console.log("SECTION SHIT", section);
  for (let i = 0; i < currentArray.length; i++) {
    const dataGet = section.contentSections.find(x => {
      return x.name === currentArray[i].name;
    });
    console.log("CURRENT ARRAY SHIT", dataGet);
    currentArray[i].dataContentFiles = dataGet.dataContentFiles;
  }

  return currentArray;
};

export const GetFileFromArray = (dataContentFiles, fileName, language) => {
  let file = "";
  let result = "";
  if (dataContentFiles !== undefined) {
    const dataFile = dataContentFiles.find(x => {
      return x.name === fileName;
    });

    let currentlanguage = "";
    if (language !== undefined) {
      currentlanguage = language;
    }

    if (dataFile !== undefined) {
      file = dataFile["file" + currentlanguage];
      if (file === undefined) {
        file = dataFile.file;
      }
      console.log(file);

      if (
        file !== undefined &&
        file !== null &&
        file.preview !== undefined &&
        file.preview !== ""
      ) {
        result = finalIP + file.preview;
      }
    }
  }
  return result;
};
