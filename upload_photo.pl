#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use File::Basename;
use File::Path qw(make_path);

my $q = CGI->new;
print $q->header('text/plain');  # JS expects plain text

my $user = $q->param('user');
unless ($user) {
    print "Missing user ID.";
    exit;
}

my @files = $q->upload('photo');
unless (@files) {
    print "No files uploaded.";
    exit;
}

# Ensure folder exists
my $upload_dir = "user_uploads/$user";
make_path($upload_dir) unless -d $upload_dir;

foreach my $file (@files) {
    my $upload_fh = $q->upload($file);
    my $filename = basename($file);
    my $save_path = "$upload_dir/$filename";

    open(my $out, '>', $save_path) or die "Cannot save file: $!";
    binmode $out;
    while (<$upload_fh>) {
        print $out $_;
    }
    close($out);
}

print "Photo(s) uploaded successfully!";
