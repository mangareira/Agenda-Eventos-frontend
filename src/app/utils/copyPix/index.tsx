
export const copyPixToClipboard = async (pix: string) => {
    try {
      await navigator.clipboard.writeText(pix);
      return alert('Código PIX copiado para a área de transferência!');
    } catch (error) {
      return alert('Erro ao copiar o código PIX. Por favor, tente novamente.');
    }
  }