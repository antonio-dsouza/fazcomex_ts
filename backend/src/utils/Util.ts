class Util {
  static extractDataNfe(nfeChave: string) {
    const serie = nfeChave.substring(22, 25);
    const number = nfeChave.substring(25, 34);

    return {
      nfe_serie: serie,
      nfe_numero: number,
    };
  }
}

export { Util }