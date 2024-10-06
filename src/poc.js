import axios from "axios";
import OpenAI from "openai";

const monthNames = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
};

function formatMonthYear(monthYear) {
  const year = monthYear.slice(0, 4);
  const month = monthYear.slice(4, 6);
  const monthName = monthNames[month];
  return `${monthName} de ${year}`;
}

const nasaApiUrl = "https://power.larc.nasa.gov/api/temporal/monthly/point";
const openApiKey =
  "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";

async function getNasaData(latitude, longitude) {
  const url = `${nasaApiUrl}?parameters=T2M,PRECTOTCORR&community=ag&start=2017&end=2022&format=json&latitude=${latitude}&longitude=${longitude}`;
  
  console.info(`Fetching NASA data for lat: ${latitude}, lon: ${longitude}`);

  try {
    const response = await axios.get(url);
    console.debug("NASA API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from NASA: ${error}`);
    throw new Error(`Erro ao buscar dados da NASA: ${error}`);
  }
}

function processNasaData(data) {
  console.info("Processing NASA data...");
  const processedData = {};
  const { T2M, PRECTOTCORR } = data.properties.parameter;

  for (const month in T2M) {
    processedData[month] = {
      temp: T2M[month],
      rain: PRECTOTCORR[month],
    };
    console.debug(`Processed data for month ${month}: temp = ${T2M[month]}, rain = ${PRECTOTCORR[month]}`);
  }

  return processedData;
}

function generateWeatherReport(data) {
  console.info("Generating weather report...");
  let prompt =
    "Média do clima mensal da região de 2017 à 2022. No formato (mês do ano): Temperatura média em °C - Preciptacação em mm/dia:\n";

  for (const month in data) {
    if (month.slice(4, 6) === "13") {
      console.warn(`Ignorando mês inválido no relatório: ${month}`);
      continue;
    }
    const formattedMonthYear = formatMonthYear(month);
    prompt += `${formattedMonthYear}: ${data[month].temp} °C - ${data[month].rain} mm/dia.\n`;
  }

  console.debug("Generated weather report:", prompt.trim());
  return prompt.trim();
}

async function fetchOpenAICompletion(
  culture,
  city,
  state,
  country,
  continent,
  latitude,
  longitude,
  weatherData
) {
  console.info(`Fetching OpenAI completion for ${culture} in ${city}, ${state}, ${country}, ${continent}`);
  
  const client = new OpenAI({
    apiKey: openApiKey,
  });

  const prompt = `
    Dados para o Relatório de Plantio e Manejo de Irrigação
  
        Informações sobre a Cultura:
            Cultura: ${culture}
  
        Informações sobre a Região:
            Cidade: ${city}
            Estado: ${state}
            País: ${country}
            Continente: ${continent}
            Latitude: ${latitude}
            Longitude: ${longitude}
  
        Dados Meteorológicos:
            ${weatherData}
  
    Instruções para gerar o relatório: 
  
        Recomendações de plantio: Use os dados meteorológicos obtidos (como temperatura e precipitação) para sugerir o período ideal de plantio. Assegure-se de considerar a necessidade específica de cada cultura em termos de temperatura e umidade do solo. Inclua dados como o mês recomendado para o plantio com base na preciptação histórica da região (seca/chuvosa).
  
        Manejo de irrigação: Utilize os dados de precipitação e temperatura para identificar os períodos em que será necessário complementar com irrigação. Indique métodos de irrigação adequados, baseando-se na localização de plantio e na disponibilidade hídrica natural durante o ciclo de crescimento.
            Embasamento: As recomendações de irrigação devem ser baseadas na precipitação média mensal e na demanda hídrica da cultura. Incluir sugestões de técnicas de irrigação adequadas à cultura e a região.
  
        Prevenção de inundações ou encharcamentos: Caso os dados indiquem risco de precipitações elevadas, mencione possíveis problemas com inundações ou encharcamento do solo. Sugira medidas para mitigar esses riscos.
            Embasamento: As recomendações devem ser baseadas nos níveis de precipitação previstos, características do solo da região, e topografia da área. Inclua informações sobre práticas de manejo do solo que possam prevenir acúmulo de água.
  
        Economia de água e sustentabilidade: Inclua dicas para otimizar o uso de água, levando em consideração a necessidade da cultura e os períodos secos. Sugira técnicas como por exemplo captação de água da chuva, cobertura do solo (mulching), e irrigação eficiente para evitar desperdícios.
            Embasamento: Essas práticas devem estar embasadas em dados sobre o regime de chuvas, o ciclo da cultura e as práticas de manejo sustentável da água. Incluir métodos comprovados de retenção de umidade e técnicas de irrigação de precisão.
  
        Conclusão: Finalize o relatório com um resumo das principais recomendações, ressaltando os benefícios de seguir o planejamento sugerido para garantir uma colheita bem-sucedida e sustentável. Indique a importância de monitorar as condições climáticas e ajustar o manejo conforme necessário.
    `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    console.debug("OpenAI response:", JSON.stringify(response, null, 2));
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching OpenAI completion:", error);
    throw error;
  }
}

async function main() {
  const params = {
    culture: "Milho",
    city: "Campo Mourão",
    state: "Paraná",
    country: "Brasil",
    continent: "América do Sul",
    latitude: -23.5505,
    longitude: -46.6333,
  };

  try {
    console.info("Starting main process...");
    const nasaData = await getNasaData(params.latitude, params.longitude);
    const processedData = processNasaData(nasaData);
    const weatherReport = generateWeatherReport(processedData);
    const aiResponse = await fetchOpenAICompletion(
      params.culture,
      params.city,
      params.state,
      params.country,
      params.continent,
      params.latitude,
      params.longitude,
      weatherReport
    );

    console.info("AI Response:", aiResponse);
  } catch (error) {
    console.error("Erro ao processar os dados:", error.message);
  }
}

main();