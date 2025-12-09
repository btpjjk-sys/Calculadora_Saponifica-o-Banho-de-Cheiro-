export class AtributosSabonete {
  hidratacao: number;
  limpeza: number;
  bolha: number;
  persistencia: number;
  dureza: number;
  solubilidade: number;
  secagem: number;

  constructor(
    hidratacao: number,
    limpeza: number,
    bolha: number,
    persistencia: number,
    dureza: number,
    solubilidade: number,
    secagem: number
  ) {
    this.hidratacao = hidratacao;
    this.limpeza = limpeza;
    this.bolha = bolha;
    this.persistencia = persistencia;
    this.dureza = dureza;
    this.solubilidade = solubilidade;
    this.secagem = secagem;
  }
}

export class Oleo {
  Nome: string;
  Indice_saponificaoNaOH: number;
  Indice_saponificaoKOH: number;
  Peso_gramas: number;
  Valores_Atributos: AtributosSabonete;

  constructor(
    Nome: string,
    Indice_saponificaoNaOH: number,
    Indice_saponificaoKOH: number,
    Valores_Atributos: AtributosSabonete,
    Peso_gramas: number = 0
  ) {
    this.Nome = Nome;
    this.Indice_saponificaoNaOH = Indice_saponificaoNaOH;
    this.Indice_saponificaoKOH = Indice_saponificaoKOH;
    this.Valores_Atributos = Valores_Atributos;
    this.Peso_gramas = Peso_gramas;
  }
}

export function Cor_Oleo_Atributo(valor: number): "verde" | "amarelo" | "vermelho" {
  const ideal: number = 10;
  const baixo: number = 5;
  const alto: number = 15;
  const min: number = 0;
  const max: number = 20;

  if (valor < min || valor > max) {
    throw new Error(`Valor do atributo '${valor}' está fora do intervalo de 0 a 20.\n`);
  }

  if (valor === ideal) {
    return "verde";
  } else if (valor >= baixo && valor <= alto) {
    return "amarelo";
  } else {
    return "vermelho";
  }
}

function Ajuste_Indice_Saponificacao(
  oleo: Oleo,
  Base: "NaOH" | "KOH",
  concentracao: number
): number {
  let Indice_Saponificao = 0;

  if (concentracao <= 0 || concentracao > 100) {
    throw new Error("A concentração está fora do intervalo");
  }

  if (Base === "NaOH") {
    Indice_Saponificao = oleo.Indice_saponificaoNaOH / (concentracao / 100);
  } else if (Base === "KOH") {
    Indice_Saponificao = oleo.Indice_saponificaoKOH / (concentracao / 100);
  }
  return Indice_Saponificao;
}

function Calcula_Base(
  Oleo_Selecionado: Oleo[],
  Base: "NaOH" | "KOH",
  sobregordura: number,
  concentracao: number
): number {
  let quantidade_base = 0;

  for (const oleo of Oleo_Selecionado) {
    if (oleo.Peso_gramas <= 0) {
      throw new Error(`Peso do óleo '${oleo.Nome}' deve ser >= 0`);
    }
    let Indice_Saponificao: number;
    if (Base === "NaOH") {
      Indice_Saponificao = Ajuste_Indice_Saponificacao(oleo, "NaOH", concentracao);
    } else {
      Indice_Saponificao = Ajuste_Indice_Saponificacao(oleo, "KOH", concentracao);
    }
    quantidade_base += (Indice_Saponificao * oleo.Peso_gramas) / 1000;
  }

  const quantidade_base_sobregordura = quantidade_base * (1 - sobregordura / 100);
  return quantidade_base_sobregordura;
}

function Calcula_Agua(quantidade_base: number, proporcao_agua: number): number {
  if (quantidade_base <= 0) {
    throw new Error("Quantidade de base deve ser deve ser maior que 0");
  }

  if (proporcao_agua <= 0) {
    throw new Error("Quantidade de agua deve ser deve ser maior que 0");
  }

  return quantidade_base * proporcao_agua;
}

function Calcula_Atributos_Sabonete_Final(oleos_selecionados: Oleo[]): AtributosSabonete {
  const atributos_finais = new AtributosSabonete(0, 0, 0, 0, 0, 0, 0);

  let peso_total_oleos = 0;
  for (const oleo of oleos_selecionados) {
    peso_total_oleos += oleo.Peso_gramas;
  }

  if (peso_total_oleos <= 0) {
    throw new Error("O peso total dos óleos deve ser maior que zero para calcular os atributos.");
  }

  for (const oleo of oleos_selecionados) {
    const peso_relativo = oleo.Peso_gramas / peso_total_oleos;
    atributos_finais.hidratacao += oleo.Valores_Atributos.hidratacao * peso_relativo;
    atributos_finais.limpeza += oleo.Valores_Atributos.limpeza * peso_relativo;
    atributos_finais.bolha += oleo.Valores_Atributos.bolha * peso_relativo;
    atributos_finais.persistencia += oleo.Valores_Atributos.persistencia * peso_relativo;
    atributos_finais.dureza += oleo.Valores_Atributos.dureza * peso_relativo;
    atributos_finais.solubilidade += oleo.Valores_Atributos.solubilidade * peso_relativo;
    atributos_finais.secagem += oleo.Valores_Atributos.secagem * peso_relativo;
  }

  return atributos_finais;
}

export interface ResultadosCalculadora {
  quantidade_base: number;
  quantidade_agua: number;
  atributos_finais: AtributosSabonete;
}

export function Gerar_Receita_Saponificacao(
  oleos_selecionados: Oleo[],
  tipo_base: "NaOH" | "KOH",
  sobregordura: number,
  pureza_base: number,
  proporcao_agua: number
): ResultadosCalculadora {
  const quantidade_base = Calcula_Base(oleos_selecionados, tipo_base, sobregordura, pureza_base);
  const quantidade_agua = Calcula_Agua(quantidade_base, proporcao_agua);
  const atributos_finais = Calcula_Atributos_Sabonete_Final(oleos_selecionados);

  return {
    quantidade_base,
    quantidade_agua,
    atributos_finais,
  };
}

export const OILS_DATA: Oleo[] = [
  new Oleo(
    "Azeite de Oliva",
    134,
    188,
    new AtributosSabonete(12, 6, 6, 8, 7, 8, 6)
  ),
  new Oleo(
    "Óleo de Coco",
    178,
    250,
    new AtributosSabonete(4, 17, 18, 6, 16, 14, 15)
  ),
  new Oleo(
    "Óleo de Palma",
    141,
    199,
    new AtributosSabonete(8, 7, 6, 10, 14, 6, 10)
  ),
  new Oleo(
    "Óleo de Rícino (Mamona)",
    128,
    180,
    new AtributosSabonete(14, 4, 16, 8, 4, 12, 4)
  ),
  new Oleo(
    "Manteiga de Karité",
    128,
    180,
    new AtributosSabonete(14, 5, 5, 9, 11, 6, 8)
  ),
  new Oleo(
    "Manteiga de Cacau",
    137,
    193,
    new AtributosSabonete(10, 5, 5, 9, 13, 5, 9)
  ),
  new Oleo(
    "Óleo de Girassol",
    134,
    188,
    new AtributosSabonete(13, 6, 5, 7, 5, 8, 5)
  ),
  new Oleo(
    "Óleo de Amêndoas Doces",
    136,
    191,
    new AtributosSabonete(13, 6, 5, 7, 5, 8, 5)
  ),
];
