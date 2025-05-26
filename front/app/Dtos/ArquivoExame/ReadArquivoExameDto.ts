export class ReadArquivoExameDto {
    
    id!: number;
    
    id_exame!: number;
    
    nome_arquivo!: string;
    
    tipo_arquivo!: string;
    
    tamanho!: number;
    
    conteudo!: Buffer;
    
    dt_upload!: Date;
}
