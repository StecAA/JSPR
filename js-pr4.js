let text = prompt("Ведите большой текст на english" ,`\n 
They' have bread or toasts' for breakfa'st. They put peanu't butte'r or jam on the brea'd. They also drink coffee with milk, tea or hot chocolate. Someone prefers a bowl of milk with cereals. Of course, it depends on the families, but they can also have a fruit juice or eat yoghurt.

    At the middle of a day there is time for lunch. At lunch the'y eat more than at breakfast. There is often an appet'izer, a main course and a dessert. They can choose a light salad with grated carrots and apples.
    
    'For the main course there is often meat. It may be chicken', beef or pork. Also they prefer ham and sausages. The mea't is served with fried potatoes, pasta, beans or rice. If they live near the sea, they eat more fish. For the dessert they have a fruit or a ca'ke. 'They prefer drink mor'e miner'al water or finish their meal' with a cup of coffee.
    
    In the evening they have dinner after 7 pm. 'Every family has their own traditions how to spend it.' Someone goes out to the restauran't; another family gets together at home. It depends on their habits. Of course, it can happen that people spend quiet evening alone. In this situation they can prefer croissants with herbal tea.
    
    \n
    `);
let text2 = text;
const regexp1 = new RegExp('\'', 'g');
document.querySelector('.goods-list').textContent = text;

text = text.replace(regexp1, '\"'); 
document.querySelector('.goods-list2').textContent = text;


 //const regexp2 = new RegExp('\'', 'g');
 let regexp2 = new RegExp('\'[^A-Za-z0-9_]', 'g');
 text2 = text2.replace(regexp2, '\" '); 
 regexp2 = new RegExp('[^A-Za-z0-9_]\'', 'g');
 text2 = text2.replace(regexp2, '\"'); 
 document.querySelector('.goods-list3').textContent = text2;
