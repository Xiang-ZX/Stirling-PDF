function compareVersions(version1, version2) {
  const v1 = version1.split(".");
  const v2 = version2.split(".");

  for (let i = 0; i < v1.length || i < v2.length; i++) {
    const n1 = parseInt(v1[i]) || 0;
    const n2 = parseInt(v2[i]) || 0;

    if (n1 > n2) {
      return 1;
    } else if (n1 < n2) {
      return -1;
    }
  }

  return 0;
}

async function getLatestReleaseVersion() {
  const url = "https://api.github.com/repos/Stirling-Tools/Stirling-PDF/releases/latest";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.tag_name ? data.tag_name.substring(1) : "";
  } catch (error) {
    console.error("Failed to fetch latest version:", error);
    return ""; // Return an empty string if the fetch fails
  }
}

async function checkForUpdate() {
  // Initialize the update button as hidden
  var updateBtn = document.getElementById("update-btn") || null;
  var updateLink = document.getElementById("update-link") || null;
  if (updateBtn !== null) {
    updateBtn.style.display = "none";
  }
  if (updateLink !== null) {
    console.log("hidden!");
    if (!updateLink.classList.contains("visually-hidden")) {
      updateLink.classList.add("visually-hidden");
    }
  }

  const latestVersion = await getLatestReleaseVersion();
  console.log("latestVersion=" + latestVersion);
  console.log("currentVersion=" + currentVersion);
  console.log("compareVersions(latestVersion, currentVersion) > 0)=" + compareVersions(latestVersion, currentVersion));
  if (latestVersion && compareVersions(latestVersion, currentVersion) > 0) {
    if (updateBtn != null) {
      document.getElementById("update-btn").style.display = "block";
    }
    if (updateLink !== null) {
      document.getElementById("app-update").innerText = currentVersion + " => " + latestVersion;
      if (updateLink.classList.contains("visually-hidden")) {
        updateLink.classList.remove("visually-hidden");
      }
    }
    console.log("visible");
  } else {
    if (updateLink !== null) {
      if (!updateLink.classList.contains("visually-hidden")) {
        updateLink.classList.add("visually-hidden");
      }
    }
    console.log("hidden");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  checkForUpdate();
});
