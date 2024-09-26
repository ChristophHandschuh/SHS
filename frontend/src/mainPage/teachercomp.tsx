import { Badge } from "@/components/ui/badge"
import React from 'react';
import { departmentColors, subjectColors } from './data.ts';

interface Teacher {
    id: number;
    name: string;
    className: string;
    department: string;
    subjects: string[];
    image: string;
}

interface Props {
    prop: Teacher;
}

const TeacherComp: React.FC<Props> = ({ prop }): JSX.Element => {
    return(
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-4 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                    src={prop.image}
                    alt={prop.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                />
                </div>
                <h2 className="text-xl font-bold mb-1 text-center">{prop.name}</h2>
                <p className="text-gray-600 mb-2">Class: {prop.className}</p>
                <Badge className={`${departmentColors[prop.department]} text-gray-800 mb-2`}>
                {prop.department}
                </Badge>
                <div className="flex flex-wrap justify-center gap-2">
                {Array.from(prop.subjects).map(subject => (
                    <Badge key={subject} className={`${subjectColors[subject]} text-white`}>
                    {subject}
                    </Badge>
                ))}
                </div>
            </div>
        </div>
    )
}

export default TeacherComp;