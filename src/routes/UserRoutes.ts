import express from 'express';
import {  User } from '../models/User';

export const router = express.Router();

router.post('/', async (req:any, res:any) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({message:"User Created Successfully"});
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

router.get('/:id', async (req:any, res:any) => {
    console.log('hii',req.params);
    
  try {
    const user = await User.findById(req.params.id);
    console.log(user,"user");
    
    if (user) {
      res.json(user,{messsage:"User Fetched"});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user' });
  }
});

router.get('/', async (req:any, res:any) => {
  try {
    const users = await User.findAll();
    res.json(users,{message:"Fetched All Users"});
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch users' });
  }
});

router.put('/:id', async (req:any, res:any) => {
  try {
    const userId=req.params.id
    // console.log(userId,req.body,"userId");
    
    const user = await User.update({id:userId,...req.body});
    console.log(user);
    
    if (user) {
      res.json({message:"User Updated Successfully"});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

router.delete('/:id', async (req:any, res:any) => {
  try {
    console.log(req.params.id);
    
    const deleted = await User.delete(req.params.id);
    console.log(deleted,"deleted adta")
    if (deleted) {
      res.json({message:"User Deleted SuccessFully"});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});
