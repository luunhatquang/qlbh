const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    
    
    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", (e) => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            console.log(id);
            let statusChange = status == "active" ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}

const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector("#form-delete-item");
    const path = formDelete.getAttribute("data-path");
    buttonDelete.forEach((button) => {
        button.addEventListener("click", (e) => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            

                // formDelete.action = action;
                // formDelete.submit();
            }
        })
    });
}