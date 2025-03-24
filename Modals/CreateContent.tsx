"use client"
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

function CreateContent() {

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[date, setDate] = useState("");
    const[completed, setCompleted] = useState(false);
    const[important, setImportant] = useState(false);

    const handleChange = (name : string) => (e: any) => {
        switch (name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "date":
                setDate(e.target.value);
                break;
            case "completed":
                setCompleted((e.target as HTMLInputElement).checked);
                break;
            case "important":
                setImportant((e.target as HTMLInputElement).checked);
                break;
            default:
                break;
        }

    };

    const {userId} = useAuth();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const task = {
            title,
            description,
            date,
            completed,
            important,
            userId,
        };
    
        console.log("📤 Submitting task:", task);  // Check if values are being sent
    
        try {
            const res = await axios.post("/api/tasks", task, {withCredentials: true});
            console.log("✅ Response from server:", res.data);
    
            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Task created successfully.");
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.error || error.response?.data?.message || "Something went wrong";
            toast.error("Something went wrong");
            console.log("❌ Axios request error:", error);
        }
    };
    
        return (
        <form onSubmit={handleSubmit}>
            <h1>Create a task</h1>
            <div className = "input-control">
                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                id = "title"
                value = {title}
                name = "title"
                onChange = {handleChange("title")}
                placeholder = "e.g. watch a video from fireship"
                />
            </div>
            <div className = "input-control">
                <label htmlFor="description">Description</label>
                <textarea
                    value = {description}
                    onChange = {handleChange("description")}
                    name = "description"
                    id = "description"
                    rows = {4}
                    placeholder = "e.g. watch a video from fireship"
                ></textarea>
            </div>
            <div className = "input-control">
                <label htmlFor="date">Date</label>
                <input
                    value = {date}
                    onChange = {handleChange("date")}
                    name = "date"
                    id = "date"
                    type = "date"
                />
            </div>
            <div className = "input-control">
                <label htmlFor="completed">Toggle Completed</label>
                <input
                    checked = {completed}
                    onChange = {handleChange("completed")}
                    name = "completed"
                    id = "completed"
                    type = "checkbox"
                />
            </div>
            <div className = "input-control toggler">
                <label htmlFor="important">Toggle Important</label>
                <input
                    checked = {important}
                    onChange = {handleChange("important")}
                    name = "important"
                    id = "important"
                    type = "checkbox"
                />
            </div>
            <div className="submit-btn">
                <button type = "submit">
                    <span>Submit</span>
                </button>
            </div>
        </form>
    );
}

export default CreateContent;