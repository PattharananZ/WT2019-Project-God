window.onload = function () {
  
    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea   = document.getElementsByClassName('answers')[0],
        checker      = document.getElementsByClassName('checker')[0],
        current      = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {
          '1.เทพเจ้าองค์ใด เป็นราชาแห่งทวยเทพ ผู้ปกครองเขาโอลิมปัส และเป็นเทพแห่งท้องฟ้า และสายฟ้า?' : ['โพไซดอน (Poseidon)', 'อาร์เทมิส (Artemis)', 'ซีอุส (Zeus)', 2],
          
          '2.เทพเจ้าองค์ใด มีลักษณะเป็นวัยกลางคน รูปร่างกำยำล่ำสัน มีหนวดเครา ถือสามง่ามเป็นอาวุธ และเป็นเทพเจ้าแห่งท้องทะเล ?' : ['เฮอร์เมส (Hermes)', 'โพไซดอน (Poseidon)' , 'เฮเฟสตัส (Hephaestus)', 1],
          
          '3.ธิดาองค์ที่2 ของโครนัส และรีอา หรือ “เทพเจ้าดีมิเตอร์ (Demeter)” เป็นเทพเจ้าแห่ง ?' : ['ความอุดมสมบูรณ์ และการเก็บเกี่ยว', 'ความตายและความร่ำรวย', 'ความสำเร็จ และชัยชนะ', 0],

          '4.“แบคคัส” เป็นบุตรของเทพซูสกับนางซิมิลี่ โดยมีพวกนิมฟ์ลเป็นผู้เลี้ยงดู เป็นที่รู้จักในอีกชื่อหนึ่งว่า ?' : ['อาเรส (Ares)', 'อธีนา (Athena)', 'ไดโอนีซุส (Dionysus)', 2],
          
          '5.เทพเจ้าองค์ใด ชาวโรมันเรียกว่า มาร์ส (Mars) เป็นเทพเจ้าแห่งสงคราม อาวุธ และชุดเกราะ และ เป็นหนึ่งในสิบสองเทพแห่งโอลิมปัส ?' : ['อธีนา (Athena)', 'อาเรส (Ares)' , 'เฮสเทีย (Hestia)', 1],
          
          '6.“เทพีอโฟรไดท์” เทพีแห่งความงามและความรัก เป็นที่รู้จักในอีกชื่อหนึ่งว่า ?' : ['วีนัส (Venus)', 'พลูโต (Pluto)', 'เนปจูน (Neptune)', 0],

          '7.เทพเจ้าองค์ใด ที่เป็นเทพเจ้าแห่งการล่าสัตว์ และดวงจันทร์ ?' : ['ฮีร่า (Hera)', 'อาร์เทมีส (Artemis)', 'ไนกี้ (Nike)', 1],

          '8.อะพอลโล เป็นเทพแห่งแสงสว่าง หรือเทพแห่งดวงอาทิตย์ รวมถึงเป็นเทพแห่งสัจจะและการดนตรี มักจะเล่นดนตรี และใช้อาวุธใด ?' : ['ฮัสซัน (Hudson) / ดาบ (Sword)', 'พิณไลร่า (Lyre) / ธนู (Archer)', 'ลูท (Lute) / หอก (Spear)', 1],
          
          '9.ฮาเดส เทพแห่งนรกใต้พิภพ ความตายและความร่ำรวย สัญลักษณ์ของพระองค์คือหมวกล่องหนและอาวุธสองง่าม  ชื่อของพระองค์ มีความหมายว่า ?' : ['ความมืดและสิ่งชั่วร้าย', 'สิ่งที่ไม่อาจต้านทานได้' , 'สิ่งที่มองไม่เห็น', 2],
          
          '10.ในบรรดาเทพทั้งหลายในวงศ์โอลิมเปี้ยน มีเทพอยู่องค์หนึ่งที่มีลักษณะไม่เหมือนกับทวยเทพองค์อื่นๆ เพราะเทพองค์นี้มีร่างกายที่เป็นกึ่งมนุษย์กึ่งสัตว์ คือ ?' : ['แพน (Pan)', 'เฮเฟสตัส (Hephaestus)', 'เฮรา (Hera)', 0]
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