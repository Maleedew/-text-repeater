import sys

def repeat_text_with_line_number(text, count):
    """Repeat the given text with line numbers."""
    for i in range(1, count + 1):
        print(f"{i}: {text}")

def main():
    print("==== Text Repeater Tool ====")
    text = input("Enter the text to repeat: ").strip()
    
    while True:
        try:
            count = int(input("Enter the number of repetitions: ").strip())
            if count < 1:
                raise ValueError
            break
        except ValueError:
            print("Please enter a valid positive number.")

    repeat_text_with_line_number(text, count)

if __name__ == "__main__":
    main()
