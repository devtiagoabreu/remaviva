/**
 * 📌 API Oficial - Rema Viva
 * Funcionamento:
 * - Recebe POST em JSON via fetch()
 * - Grava todos os dados em UMA planilha
 * - Colunas: timestamp | nome | email | whatsapp | tipo | produto | valor
 * - Aceita envio anônimo quando configurado como Web App público
 */
function doPost(e) {
  try {
    // Pega a planilha ATIVA (vinculada a este script)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona uma linha com os dados e timestamp
    var timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.tipo || '',
      data.produto || '',
      data.valor || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Dados salvos na planilha'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("API Rema Viva - Funcionando")
    .setMimeType(ContentService.MimeType.TEXT);
}

function testeManual() {
  console.log('🧪 INICIANDO TESTE MANUAL');
  
  try {
    // 1. Verifica se consegue acessar a planilha
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log('✅ Planilha encontrada:', ss.getName());
    console.log('📋 ID da planilha:', ss.getId());
    
    // 2. Pega a primeira aba
    var sheet = ss.getActiveSheet();
    console.log('📄 Aba atual:', sheet.getName());
    
    // 3. Verifica quantas linhas existem
    var ultimaLinhaAntes = sheet.getLastRow();
    console.log('📊 Última linha antes do teste:', ultimaLinhaAntes);
    
    // 4. Mostra as últimas 5 linhas (se existirem)
    if (ultimaLinhaAntes > 0) {
      var ultimasLinhas = Math.min(5, ultimaLinhaAntes);
      var dados = sheet.getRange(ultimaLinhaAntes - ultimasLinhas + 1, 1, ultimasLinhas, 7).getValues();
      console.log('📝 Últimas ' + ultimasLinhas + ' linhas:');
      dados.forEach(function(linha, index) {
        console.log('   Linha ' + (ultimaLinhaAntes - ultimasLinhas + index + 1) + ':', linha);
      });
    }
    
    // 5. Adiciona uma nova linha de teste
    var timestamp = new Date();
    var dadosTeste = [
      timestamp,
      'TESTE MANUAL - ' + timestamp.toLocaleTimeString(),
      'teste@manual.com',
      '(11) 98765-4321',
      'manual',
      'Produto Teste Manual',
      'R$ 99,90'
    ];
    
    console.log('🔄 Adicionando nova linha:', dadosTeste);
    
    sheet.appendRow(dadosTeste);
    
    // 6. Verifica se adicionou
    var ultimaLinhaDepois = sheet.getLastRow();
    console.log('✅ Última linha depois do teste:', ultimaLinhaDepois);
    
    if (ultimaLinhaDepois > ultimaLinhaAntes) {
      console.log('🎉 SUCESSO! Nova linha adicionada na linha', ultimaLinhaDepois);
      
      // Mostra a linha adicionada
      var linhaAdicionada = sheet.getRange(ultimaLinhaDepois, 1, 1, 7).getValues()[0];
      console.log('📋 Linha adicionada:', linhaAdicionada);
      
      return '✅ TESTE BEM-SUCEDIDO! Nova linha ' + ultimaLinhaDepois + ' adicionada.';
    } else {
      console.log('⚠️ ATENÇÃO: Número de linhas não aumentou!');
      return '⚠️ Teste inconclusivo - verifique manualmente a planilha.';
    }
    
  } catch (error) {
    console.error('❌ ERRO NO TESTE MANUAL:', error);
    console.error('Stack trace:', error.stack);
    return '❌ ERRO: ' + error.toString();
  }
}

// Função EXTRA para testar o doPost simulando
function testarDoPostSimulado() {
  console.log('🧪 TESTANDO doPost SIMULADO');
  
  try {
    // Cria um objeto fake que simula a requisição do frontend
    var requestFake = {
      postData: {
        contents: JSON.stringify({
          nome: "SIMULAÇÃO FRONTEND",
          email: "simulacao@frontend.com",
          whatsapp: "(11) 99999-9999",
          tipo: "gratuito",
          produto: "",
          valor: ""
        })
      }
    };
    
    console.log('📤 Dados simulados:', requestFake.postData.contents);
    
    // Executa o doPost com os dados simulados
    var resultado = doPost(requestFake);
    
    console.log('✅ doPost executado com sucesso');
    console.log('📄 Resultado:', resultado.getContent());
    
    return '✅ Teste doPost simulado concluído';
    
  } catch (error) {
    console.error('❌ Erro no teste simulado:', error);
    return '❌ Erro: ' + error.toString();
  }
}

// Função para LIMPAR dados de teste (opcional - use com cuidado)
function limparTestes() {
  console.log('🧹 LIMPANDO DADOS DE TESTE');
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var ultimaLinha = sheet.getLastRow();
    
    if (ultimaLinha <= 1) {
      console.log('📭 Planilha já está vazia ou só tem cabeçalho');
      return 'Nada para limpar';
    }
    
    // Verifica quais linhas são de teste
    var dados = sheet.getRange(2, 2, ultimaLinha - 1, 1).getValues(); // Coluna B (nome)
    var linhasParaManter = [];
    
    for (var i = 0; i < dados.length; i++) {
      var nome = dados[i][0];
      // Mantém linhas que NÃO são de teste
      if (!nome || !nome.toString().includes('TESTE') && !nome.toString().includes('SIMULAÇÃO')) {
        linhasParaManter.push(i + 2); // +2 porque começa da linha 2
      }
    }
    
    console.log('📊 Total de linhas:', ultimaLinha);
    console.log('💾 Linhas para manter:', linhasParaManter.length);
    
    if (linhasParaManter.length === ultimaLinha - 1) {
      console.log('✅ Nenhum dado de teste encontrado');
      return 'Nenhum dado de teste para limpar';
    }
    
    return '⚠️ Função de limpeza comentada por segurança';
    
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
    return 'Erro: ' + error.toString();
  }
}