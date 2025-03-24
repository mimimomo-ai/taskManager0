import { NextResponse } from "next/server";
import { auth }  from "@clerk/nextjs/server";
import prisma from "@/app/utils/connect";

export async function POST(req: Request) {
    try {
        console.log("🔍 Incoming POST request...");

        const authData = await auth();
        console.log("Auth Data: ", authData);

        const { userId } = authData;
        console.log("🔑 Authenticated user ID:", userId);
        if (!userId) {
            console.log("❌ Unauthorized request!");
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const { uesrId, title, description, date, completed, important } = await req.json();
        console.log("📩 Received data:", { userId, title, description, date, completed, important });

        if (!title || !description || !date) {
            console.log("❌ Missing required fields!");
            return NextResponse.json({ error: "Missing required fields", status: 400 });
        }

        if (title.length < 3) {
            console.log("❌ Title is too short!");
            return NextResponse.json({ error: "Title must be at least 3 characters long", status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,
                userId,
            },
        });

        console.log("✅ Task created successfully:", task);
        return NextResponse.json(task);
    } catch (error: any) {
        console.error("❌ ERROR CREATING TASK:", error.message || error);
        return NextResponse.json({ error: error.message || "Error creating task", status: 500 });
    }
}




export async function GET(req : Request){
    try{

    }catch (error) {
        console.log("ERROR GETTING TASKS: ", error);
        return NextResponse.json({ error: "Error updating task", status: 500 });
    }
}

export async function PUT(req : Request){
    try{

    }catch (error) {
        console.log("ERROR UPDATING TASK: ", error);
        return NextResponse.json({ error: "Error creating task", status: 500 });
    }
}

export async function DELETE(req : Request){
    try{

    }catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}