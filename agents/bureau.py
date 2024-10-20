from uagents import Bureau
from true_or_false import true_or_false
from quiz_generator import quiz_generator
from short_answer import short_answer
from contentChecker import content_checker
from contentCleaner import content_cleaner

bureau = Bureau(port=8001)
bureau.add(true_or_false)
bureau.add(quiz_generator)
bureau.add(short_answer)
bureau.add(content_checker)
bureau.add(content_cleaner)

if __name__ == "__main__":
    bureau.run()