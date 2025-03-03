import{ GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai';


const statusmsg=document.getElementById("api-status");

document.getElementById("try-now").addEventListener("click",function(){
    document.getElementById("summarizer").scrollIntoView({behavior:"smooth"});
})

document.getElementById("save-api-key").addEventListener("click", function(){

    const apikey = document.getElementById("api-key-input").value.trim();
    
    if(apikey){
        localStorage.setItem("gemini-api-key",apikey);
        document.getElementById("api-key-input").value="";
        statusmsg.innerText="API Key saved";
        statusmsg.style.color="green";
    }
    else{
        statusmsg.innerText="Please provide a valid API key";
        statusmsg.style.color="red";
    }
})


document.querySelectorAll(".summary-btn").forEach((button)=>{
    button.addEventListener("click",async function(){
        const text=document.getElementById("text-input").value.trim();

        if(!text){
            alert("please provede a text to the summarizer");
            return;
        }

        const summaryLength = this.getAttribute("data-length");

        const summary= await getsummary(text,summaryLength);
        document.getElementById("summary-output").textContent=summary;
        document.getElementById("summary-output").style.display="block";

        document.getElementById("summary-output").scrollIntoView({behavior:"smooth"});
  


    })
})
// go to ai.google.dev and get the api key and also nodejscode to run the gemini api

async function getsummary(text,summaryLength){
    const promptmap={
        short : "provide a short summary of this text:",
        medium : "provide a medium length summary of this text",
        detailed : "provide a detailed summary of this text:",
    }
    const apikey=localStorage.getItem("gemini-api-key");

    const genAI = new GoogleGenerativeAI(apikey);    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `${promptmap[summaryLength]}\n${text}`;


    const result = await model.generateContent(prompt);

    return  result.response.text();

}
