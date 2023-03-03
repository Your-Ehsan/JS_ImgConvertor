let FileInput = document.querySelector("#FileInput"),
  WidthInput = document.querySelector("#WidthInput"),
  HeightInput = document.querySelector("#HeightInput"),
  ratio = document.querySelector("#ratio"),
  quality = document.querySelector("#quality"),
  SelectedIMG = document.querySelector("#SelectedIMG"),
  UploadBox = document.querySelector("#UploadBox"),
  InputText = document.querySelector(".InputText"),
  DownloadBtn = document.querySelector("#DownloadBtn");

let OgImageRatio;
const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  SelectedIMG.src = URL.createObjectURL(file);
  SelectedIMG.addEventListener("load", () => {
    SelectedIMG.removeAttribute("hidden");
    document.querySelector("#InputSVG").classList = "hidden";
    InputText.className = "hidden";
    WidthInput.value = SelectedIMG.naturalWidth;
    HeightInput.value = SelectedIMG.naturalHeight;
    OgImageRatio = SelectedIMG.naturalWidth / SelectedIMG.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
};
WidthInput.addEventListener("keyup", () => {
  const height = ratio.checked
    ? WidthInput.value / OgImageRatio
    : HeightInput.value;
  HeightInput.value = Math.floor(height);
});
HeightInput.addEventListener("keyup", () => {
  const width = ratio.checked
    ? HeightInput.value / OgImageRatio
    : WidthInput.value;
  HeightInput.value = Math.floor(width);
});
function ResizeandDownload() {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  canvas.width = WidthInput.value;
  canvas.height = HeightInput.value;

  const imgQuality = quality.checked ? 0.2 || 0.5 : 1.0;

  ctx.drawImage(SelectedIMG, 0, 0, canvas.width, canvas.height);
  a.href = canvas.toDataURL("image/webp", imgQuality);
  a.download = `@your-ehsan_${new Date().getTime()}`;
  a.click();
}
DownloadBtn.addEventListener("click", ResizeandDownload);
FileInput.addEventListener("change", loadFile);
UploadBox.addEventListener("click", () => FileInput.click());
