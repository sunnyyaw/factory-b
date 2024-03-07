const navbarList = document.getElementById('navbar-list');
const addButton = document.getElementById('btn-add');
const sortButton = document.getElementById('btn-sort');
const navigationBarURL = 'http://localhost:8081/navigationBar';

const handleClick = (index) => {
  const button = document.getElementById(`btn-${index}`);
  const submitButton = document.getElementById(`btn-submit-${index}`);
  const deleteButton = document.getElementById(`btn-delete-${index}`);
  const inputs = document.getElementsByClassName(`input-${index}`);

  if (button.textContent === '编辑') {
    submitButton.hidden = false;
    deleteButton.hidden = true;
    button.textContent = '取消';
    [...inputs].forEach(input => input.disabled = false);
  } else {
    submitButton.hidden = true;
    deleteButton.hidden = false;
    button.textContent = '编辑';
    [...inputs].forEach(input => input.disabled = true);
  }
};
const handleCancelAdd = () => {
  const listItem = document.getElementById(`li-add`);
  listItem.remove();
  addButton.hidden = false;
};


const handleAdd = () => {
  navbarList.innerHTML += 
  `<li id="li-add">
    <form onsubmit="return handleSubmit();">
    编号: <label><input disabled></label>
    顺序: <label><input disabled></label>
    导航项名: <label><input id="input-add-name" required></label>
    导航地址: <label><input id="input-add-href" required></label>
    <button id="btn-cancel" type="button" onclick="handleCancelAdd()">取消</button>
    <input id="btn-confirm" type="submit" value="确认">
    <form>
  </li>`;
  addButton.hidden = true;
};

const handleSubmit = () => {
  const name = document.getElementById(`input-add-name`).value;
  const href = document.getElementById(`input-add-href`).value;
  const body = {name,href,sort: 0};
  console.log(body);
  fetch(navigationBarURL,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status === 200) {
      getList();
    } else {
      console.error(response);
    }
  })
  .catch(error => console.error(error));
};

const handleEdit = (index) => {
  const id = document.getElementById(`input-${index}-id`).value;
  const name = document.getElementById(`input-${index}-name`).value;
  const href = document.getElementById(`input-${index}-href`).value;
  const body = {id,name,href};
  fetch(navigationBarURL,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status === 200) {
      getList();
    } else {
      console.error(response);
    }
  })
  .catch(error => console.error(error));
};

const handleDelete = (index) => {
  const id = document.getElementById(`input-${index}-id`).value;
  fetch(`${navigationBarURL}/${id}`,{
    method: 'DELETE',
  }).then(response => {
    if (response.status === 200) {
      getList();
    } else {
      console.error(response);
    }
  })
  .catch(error => console.error(error));
};

const getList = () => {
  fetch(navigationBarURL)
  .then(data => data.json())
  .then(data => {
    const navList = data;

    navbarList.innerHTML = '';
    navList.forEach((navItem,index) => {
      navbarList.innerHTML += 
      `
        <li draggable="true" class="navlist-item" id="li-${index}">
          编号: <label><input id="input-${index}-id" class="input-id" value=${navItem.id} 
          placeholder="导航栏编号" disabled></label>
          顺序：<label><input id="input-${index}-sort" class="input-sort"
          value=${index} placeholder="导航栏顺序" disabled ></label>
          导航项名: <label><input id="input-${index}-name" class="input-${index}"
           value=${navItem.name} placeholder="输入导航栏内容" disabled ></label>
          导航地址: <label><input id="input-${index}-href" class="input-${index}"
           value=${navItem.href} placeholder="导航栏地址" disabled></label>
          <button id="btn-${index}" type="button" onclick="handleClick(${index})">编辑</button>
          <button id="btn-submit-${index}" type="button" onclick="handleEdit(${index})" hidden>提交</button>
          <button id="btn-delete-${index}" type="button" onclick="handleDelete(${index})">删除</button>
        </li>
      `;
    });
    addButton.hidden = false;
  })
  .catch(error => console.error(error));
}
const handleSort = () => {
  const navList = navbarList.children;
  const id_sortMap = [...navList].map((navItem,index) => {
    const id = navItem.getElementsByClassName('input-id')[0].value;
    return {id,sort: index};
  });
  fetch(navigationBarURL + '/sort',{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(id_sortMap),
  }).then(response => {
    if(response.status === 200) {
      getList();
    } else {
      console.log(response)
    }
  })
  .catch(error => console.error(error));
};

const init = () => {
  addButton.addEventListener('click',handleAdd);
  sortButton.addEventListener('click',handleSort);
  navbarList.addEventListener('dragstart', e => {
    e.dataTransfer.effectAllowed = 'move';
    currentLi = e.target;
    setTimeout(() => currentLi.classList.add('moving'));
  });
  navbarList.addEventListener('dragenter', e => {
    e.preventDefault();
    if (e.target === currentLi || e.target === navbarList ) {
      return;
    }
    let liArr = Array.from(navbarList.children);
    let currentIndex = liArr.indexOf(currentLi);
    let targetIndex = liArr.indexOf(e.target);
    if (targetIndex === -1) return;
    if (currentIndex < targetIndex) {
      navbarList.insertBefore(currentLi,e.target.nextElementSibling);
    } else {
      navbarList.insertBefore(currentLi,e.target);
    }
  });
  navbarList.addEventListener('dragover',e => e.preventDefault());
  navbarList.addEventListener('dragend',e => currentLi.classList.remove('moving'));
  getList();
};

init();


