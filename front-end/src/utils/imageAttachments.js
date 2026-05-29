export function criarAnexosDeImagem(fileList) {
  const arquivos = Array.from(fileList ?? []).filter((arquivo) => arquivo.type.startsWith('image/'));

  return Promise.all(
    arquivos.map((arquivo) => new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          id: `${arquivo.name}-${arquivo.lastModified}`,
          nome: arquivo.name,
          tipo: arquivo.type,
          tamanho: arquivo.size,
          url: reader.result,
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(arquivo);
    })),
  );
}
