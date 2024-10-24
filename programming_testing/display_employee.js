const employees = [
    { name: 'Janny', position: 'Front End' },
    { name: 'Game', position: 'Back End' }
];

const displayEmployee = (inputEmployees) => {
    if (!inputEmployees.length) {
        console.log('กรุณาใส่ข้อมูลพนักงานที่ต้องการแสดงอย่างน้อย 1 คน');
        return;
    }
    inputEmployees.forEach((inputEmployee) => {
        const targetName = inputEmployee.name;
        const foundEmployee = employees.find((emp) => emp.name.toLowerCase() === targetName.toLowerCase().trim());
        if (foundEmployee) {
            console.log(`ชื่อ ${foundEmployee.name} ตำแหน่ง ${foundEmployee.position}`);
        } else {
            console.log(`Employee with name ${targetName} not found`);
        }
    });
};

// usage example
const input = [
    { name: 'Arm', position: 'Front End' },
    { name: 'Game', position: 'Back End' }
];

displayEmployee(input);