const Button_status = document.querySelectorAll("[button_status]");

if(Button_status.length > 0) {
    let url = new URL(window.location.href);
    Button_status.forEach((button) => {
        button.addEventListener("click", (e) => {
            const status = button.getAttribute("button_status");
            if(status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    })
}

const Form_search = document.querySelector("#form-search");
if(Form_search) {
    let url = new URL(window.location.href);
    Form_search.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;    

    });
}

const Button_pagination = document.querySelectorAll("[button-pagination]");
if (Button_pagination.length > 0) {
    let url = new URL(window.location.href);
    Button_pagination.forEach((button) => {
        button.addEventListener("click", (e) => {
            const page = button.getAttribute("button-pagination");
            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        });
    });
}
