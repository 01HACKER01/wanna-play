// ====== Get Random Item ======
export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // ====== Modal Handler ======
  export function handleModal(modalId, action = 'open') {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = (action === 'open') ? 'flex' : 'none';
    }
  }
  
  // ====== Get Name from URL ======
  export function getNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name') || '';
  }