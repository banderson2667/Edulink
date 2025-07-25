  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, avalie com as estrelas antes de enviar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (response.ok) {
        alert('Obrigado por sua avaliação! Sua opinião é muito importante para nós.');
        setRating(0);
        setHovered(0);
        setFormData({
          title: '',
          comments: '',
          recommend: '',
        });
      } else {
        alert('Erro ao enviar a avaliação. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao enviar a avaliação. Tente novamente.');
    }
  };