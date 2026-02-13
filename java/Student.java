class Student {

    // Default constructor
    Student() {
        System.out.println("Constructor called");
    }

    //parameterized Constructor
    Student(int i, String n) {
        id = i;
        name = n;
    }

    // Copy constructor
    Student(Student s) {
        id = s.id;
        name = s.name;
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student(101, "Aryan");
        Student s3 = new Student(s2);

        System.out.println(s3.id + " " + s3.name);
    }
}

