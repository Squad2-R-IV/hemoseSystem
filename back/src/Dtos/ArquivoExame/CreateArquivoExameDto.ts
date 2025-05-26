export class CreateArquivoExameDto {
    
    id_exame!: number;
    
    nome_arquivo!: string;
    
    tipo_arquivo!: string;
    
    tamanho!: number;
    
    conteudo!: Buffer;
}
