function confirmRefresh() {
    const isConfirmed = confirm("Are you sure you want to start a new resume? All unsaved changes will be lost.");
    if (isConfirmed) {
        window.location.reload();
    }
}
