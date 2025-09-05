
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = y);

  const form = document.querySelector('#form-contacto');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const datos = new FormData(form);
      const nombre = encodeURIComponent(datos.get('nombre') || '');
      const correo = encodeURIComponent(datos.get('correo') || '');
      const telefono = encodeURIComponent(datos.get('telefono') || '');
      const tipo = encodeURIComponent(datos.get('tipo') || '');
      const unidades = encodeURIComponent(datos.get('unidades') || '');
      const mensaje = encodeURIComponent(datos.get('mensaje') || '');
      const body = `Nombre: ${nombre}%0AEmail: ${correo}%0ATeléfono: ${telefono}%0ATipo: ${tipo}%0AUnidades: ${unidades}%0A---%0A${mensaje}`;
      window.location.href = `mailto:zar.2528@hotmail.com?subject=Consulta%20Administraci%C3%B3n%20de%20Condominio&body=${body}`;
    });
  }
});
