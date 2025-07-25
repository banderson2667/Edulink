const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      alert('Por favor, escreva uma mensagem antes de enviar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (response.ok) {
        alert(`Mensagem enviada para Dra. Laise Cavalcante:\n\n"${trimmed}"`);
        setMessage('');
        setShowModal(false);
      } else {
        alert('Erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao enviar a mensagem. Tente novamente.');
    }
  };
  