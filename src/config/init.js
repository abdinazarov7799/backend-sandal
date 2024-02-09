const Roles = require('../models/roles');
const Branches = require('../models/branches');
const Users = require('../models/users');
const bcrypt = require("bcrypt");

const updateOrCreate = async (model, data, condition) => {
    const existingRecord = await model.findOne({ where: condition });

    if (existingRecord) {
        await existingRecord.update(data);
        console.log(`${model.name} updated successfully.`);
    } else {
        await model.create(data);
        console.log(`${model.name} created successfully.`);
    }
};

const updateOrCreateModels = async () => {
    const hashedPassword = await bcrypt.hash('s@nd@l2024', 10);
    const rolesData = [
        {
            id: 1,
            name: 'admin',
            description: 'Administrator roli',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'user',
            description: 'Foydalanuvchi roli',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const branchesData = [
        {
            id: 1,
            name: "Navoiy",
            description: "Bosh ofis",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const usersData = [
        {
            id: 1,
            login: 'admin',
            password: hashedPassword,
            firstname: 'Admin',
            lastname: 'Admin',
            phone: '+998 94 370 32 22',
            role_id: 1,
            branch_id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    for (const roleData of rolesData) {
        await updateOrCreate(Roles, roleData, { id: roleData.id });
    }

    for (const branchData of branchesData) {
        await updateOrCreate(Branches, branchData, { id: branchData.id });
    }

    for (const userData of usersData) {
        await updateOrCreate(Users, userData, { id: userData.id });
    }
};

module.exports = { updateOrCreateModels };
