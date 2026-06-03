const preview = document.getElementById("cursorPreview");
const previewImg = preview.querySelector("img");

document.querySelectorAll(".project-btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        const img = btn.getAttribute("data-preview");
        if (!img) return;

        previewImg.src = img;
        preview.style.opacity = "1";
    });

    btn.addEventListener("mousemove", (e) => {
        preview.style.left = e.clientX + "px";
        preview.style.top = e.clientY + "px";
    });

    btn.addEventListener("mouseleave", () => {
        preview.style.opacity = "0";
        previewImg.src = ""; // clears image like you wanted
    });
});