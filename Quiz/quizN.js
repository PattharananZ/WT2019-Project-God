window.onload = function () {
  
    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea   = document.getElementsByClassName('answers')[0],
        checker      = document.getElementsByClassName('checker')[0],
        current      = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {
          '1.เทพเจ้าองค์ใดเป็นผู้สร้างอักษรรูน ?' : ['โอดิน (Odin)', 'ธอร์ (Thor)', 'โลกิ (Loki)', 0],
          
          '2.เทพเจ้าองค์ใดเป็นเทพแห่งแสง ?' : ['โลกิ (Loki)', 'บัลเดอร์ (Baldr)' , 'ฟริกก์ (Frigg)', 1],
          
          '3.นาวี (Narvi) และ วาลี (Vali) เป็นลูกของเทพเจ้าองค์ใด ?' : ['โลกิ (Loki)', 'เฟรย่า (Freya)', 'เทียร์ (Tear)', 0],

          '4.ข้อใดไม่ถูกต้องเกี่ยวกับเทพเจ้าเฟรย่า' : ['มีสามีชื่อออตา(Od)', 'เป็นเทพีผู้ควบคุมหน่วยวาลคีรี่', 'เกลียดยักษ์เข้าไส้', 2],
          
          '5.เทพเจ้าองค์ใดเป็นเทพแห่งสายฟ้าและการเพาะปลูก ?' : ['โลกิ (Loki)', 'ธอร์ (Thor)' , 'บัลเดอร์ (Baldr)', 1],
          
          '6.ม้าของโอดินที่ชื่อว่าสเลปนีร์มีกี่ขา ?' : ['4 ขา', '6 ขา', '8 ขา', 2]
        };
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
    }
    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answer is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      
      answerArea.innerHTML = '';
      
      for (var i = 0; i < answers.length -1; i += 1) {
        var createDiv = document.createElement('div'),
            text = document.createTextNode(answers[i]);
        
        createDiv.appendChild(text);      
        createDiv.addEventListener("click", checkAnswer(i, answers));
        
        
        answerArea.appendChild(createDiv);
      }
    }
    
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is sams as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.
      
      return function () {
        var givenAnswer = i,
            correctAnswer = arr[arr.length-1];
        
        if (givenAnswer === correctAnswer) {
          addChecker(true);             
        } else {
          addChecker(false);                        
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          
          loadQuestion(current);
          loadAnswers(current);
        } else {
          questionArea.innerHTML = 'Done';
          answerArea.innerHTML = '';
        }
                                
      };
    }
    
    function addChecker(bool) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div'),
          txt       = document.createTextNode(current + 1);
      
      createDiv.appendChild(txt);
      
      if (bool) {
        
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    
    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };