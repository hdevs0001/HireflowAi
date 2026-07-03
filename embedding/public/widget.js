(() => {
    // Find the container on the host website
    const host = document.getElementById("hireflow-widget");

    if (!host) {
        console.error("hireflow-widget container not found");
        return;
    }

    // Prevent creating the widget twice
    if (host.shadowRoot) {
        return;
    }

    // Create Shadow DOM
    const shadow = host.attachShadow({
        mode: "open",
    });

    shadow.innerHTML = `
<style>

*{
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}

.open-btn{
    background:#2563eb;
    color:white;
    border:none;
    padding:14px 22px;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
}

.overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.5);
    display:none;
    justify-content:center;
    align-items:center;
    z-index:9999;
}

.modal{
    width:420px;
    background:white;
    padding:20px;
    border-radius:12px;
    box-shadow:0 10px 25px rgba(0,0,0,.2);
}

input{
    width:100%;
    padding:12px;
    margin:10px 0;
    border:1px solid #ddd;
    border-radius:6px;
}

.submit{
    width:100%;
    padding:12px;
    background:#2563eb;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
}

.close{
    float:right;
    cursor:pointer;
    font-size:20px;
    font-weight:bold;
}

h2{
    margin-top:0;
}

</style>

<button class="open-btn">
    Apply Now
</button>

<div class="overlay">

    <div class="modal">

        <div class="close">✕</div>

        <h2>Apply for Job</h2>

        <input id="name" placeholder="Full Name">

        <input id="email" type="email" placeholder="Email">

        <input id="resume" type="file">

        <button class="submit">
            Submit
        </button>

    </div>

</div>
`;

    const openBtn = shadow.querySelector(".open-btn");
    const overlay = shadow.querySelector(".overlay");
    const close = shadow.querySelector(".close");
    const submit = shadow.querySelector(".submit");

    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    close.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    submit.addEventListener("click", () => {

        const name = shadow.querySelector("#name").value;
        const email = shadow.querySelector("#email").value;

        alert(
            `Submitted\n\nName: ${name}\nEmail: ${email}`
        );

        overlay.style.display = "none";

    });

})();