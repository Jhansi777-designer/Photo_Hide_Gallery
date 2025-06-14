#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use File::Spec;

my $q = CGI->new;
print $q->header('text/plain');

my $user = $q->param('user');
my $filename = $q->param('filename');

unless ($user && $filename) {
    print "Missing user or filename.";
    exit;
}

my $filepath = File::Spec->catfile("user_uploads", $user, $filename);

if (-e $filepath) {
    unlink $filepath or print "Could not delete file.";
    print "Photo deleted successfully.";
} else {
    print "File not found.";
}

# #!C:/Strawberry/perl/bin/perl.exe
# use strict;
# use warnings;
# use CGI;
# use CGI::Carp qw(fatalsToBrowser);
# use File::Spec;

# my $q = CGI->new;
# print $q->header('text/plain');

# my $user = $q->param('user');
# my $filename = $q->param('filename');

# unless ($user && $filename) {
#     print "Missing user or filename.";
#     exit;
# }

# my $filepath = File::Spec->catfile("user_uploads", $user, $filename);

# if (-e $filepath) {
#     unlink $filepath or print "Could not delete file.";
#     print "Photo deleted successfully.";
# } else {
#     print "File not found.";
# }
