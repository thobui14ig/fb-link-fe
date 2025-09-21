const closeModal = (id: string) => {
  const modalEl = document.getElementById(id)
  const modalInstance =
    (window as any).bootstrap.Modal.getInstance(modalEl) ||
    new (window as any).bootstrap.Modal(modalEl)
  modalInstance.hide()
}

export { closeModal }
